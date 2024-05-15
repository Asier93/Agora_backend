import Game from "../Models/game.model.js";
import Level from "../Models/level.model.js";
import Block from "../Models/block.model.js";
import Option from "../Models/option.model.js";
import Point from "../models/point.model.js";
import Jwt from "jsonwebtoken";
import Category from "../Models/category.model.js";
import mongoose from "mongoose";


export const info = async (req, res) => {
          const game = req.params.game;

          const token = req.header("auth-token")
          const decoded = Jwt.decode(token);
          const userId = decoded?._id;

          const categories = await Category.find();

          try {
                    let actualLevel = ""; 
                    let actualBlock = "";
                    let actualLevelId = ""; 
                    let actualBlockId = "";
                    let responseSent = false;
                    const Levels = await Level.find().sort({ number: 1 });
                    for (const level of Levels) {
                              const resultLevel = await pointsByLevelAndGame(game, level._id.toString());
                              if (resultLevel.length < 28) {
                                        actualLevel = level.name; actualLevelId = level._id.toString();
                                        const Blocks = await Block.find({ levelId: level._id.toString() }).sort({ number: 1 });
                                        for (const block of Blocks) {
                                                  const resultBlock = await pointsByBlockAndGame(game, block._id.toString());
                                                  if (resultBlock.length < 4) {
                                                            actualBlock = block.name; 
                                                            actualBlockId = block._id.toString();
                                                            const Categories = await Category.find()
                                                            for (const category of Categories) {
                                                                      const resultCategory = await pointsByCategoryAndBlockAndGame(game, block._id.toString(), category._id.toString())
                                                                      if (resultCategory.length < 1) {
                                                                        const options = await optionsByCategoryAndBlockAndGame(game, block._id.toString(), category._id.toString());
                                                                        const concatenatedNames = options.map(o => o.name).join(', ');
                                                                        const concatenatedNamesId = options.map(o => o._id.toString()).join(', ');
                                                                        const concatenatedDescriptions = options.map(o => o.description).join(', '); 
                                                                        console.log("Concatenated Descriptions:", concatenatedDescriptions);

                                                                        res.status(200).json(`${actualLevel}: ${actualLevelId}  | ${actualBlock}: ${actualBlockId}  | Categoría ${category.name}: ${concatenatedNames}: ${concatenatedNamesId}, ${concatenatedDescriptions} `);
                                                                        responseSent = true;
                                                                        break;
                                                                    }
                                                                    
                                                            }
                                                  }
                                                  if (responseSent) break;
                                        }
                              }
                              if (responseSent) break;
                    }
                    if (!responseSent) {
                              res.status(200).json("Partida terminada");
                    }
          } catch (error) {
                    if (!res.headersSent) {
                              res.status(500).json({ error: error.message });
                    }
          }
};

async function pointsByLevelAndGame(game, levelId) {
          const blocks = await Block.find({ levelId: levelId })
          const blockIds = blocks.map(block => block._id);
          const points = await Point.find({ gameId: game })
                    .populate({
                              path: 'optionId',
                              match: { blockId: { $in: blockIds } }
                    }).exec();
          const pointsFilter = points.filter(point => point.optionId !== null);
          return pointsFilter;
}

async function pointsByBlockAndGame(game, blockId) {
          const points = await Point.find({ gameId: game })
                    .populate({
                              path: 'optionId',
                              match: { blockId: blockId }
                    }).exec();
          const pointsFilter = points.filter(point => point.optionId !== null);
          return pointsFilter;
}

async function pointsByCategoryAndBlockAndGame(game, blockId, categoryId) {
          const points = await Point.find({ gameId: game })
                    .populate({
                              path: 'optionId',
                              match: { blockId: blockId , categoryId: categoryId }
                    }).exec();
          const pointsFilter = points.filter(point => point.optionId !== null);
          return pointsFilter;
}

async function optionsByCategoryAndBlockAndGame(game, blockId, categoryId) {
          const points = await Point.find({ gameId: game })
          .populate({
                    path: 'optionId',
                    match: { blockId: blockId }
          }).exec();
          const pointsFilter = points.filter(point => point.optionId !== null);
          // Crea un conjunto de nombres de `optionId` en `points`
          const pointNames = new Set(pointsFilter.map(point => point.optionId.name.trim()));
          const options = await Option.find({ blockId: blockId, categoryId: categoryId});   
          // Filtra las opciones que también están en el conjunto `pointNames`
          const uniqueOptions = options.filter(option => !pointNames.has(option.name.trim()));
          console.log(uniqueOptions);
          return uniqueOptions;
}



