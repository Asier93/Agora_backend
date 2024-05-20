import Point from "../models/point.model.js";
import Category from "../Models/category.model.js";
import Option from "../Models/option.model.js";
import Jwt from "jsonwebtoken";
import Block from "../Models/block.model.js";
import { set } from "mongoose";

export const point = async (req, res) => {
  const game = req.params.game;
  const option = req.params.option;

  const token = req.header("auth-token");
  const decoded = Jwt.decode(token);
  const user = decoded._id;

  // A qué categoría pertenece la opción
  const infoOption = await Option.findOne({ _id: option }).exec();
  // A qué bloque pertenece la opción
  const block = await Block.findOne({
    _id: infoOption.blockId.toString(),
  }).exec();
  const category = await Category.findOne({
    _id: infoOption.categoryId.toString(),
  }).exec();

  // En función de la categoría asigno el valor del punto
  let value = 0;
  if (category.name == 1) {
    value = "+1";
  }
  if (category.name == 2) {
    value = "0";
  }
  if (category.name == 3) {
    //console.log(category.name)
    value = "0";
    // En esta opción necesitaría saber qué atributo se quedaron sin seleccionar para ponerle un punto negativo
    // Lo que está puntuado

    const optionIds = await Option.find({ blockId: block._id })
      .select("_id")
      .exec();
    const optionIdList = optionIds.map((option) => option._id);
    const pointsBlock = await Point.find({
      gameId: game,
      optionId: { $in: optionIdList },
    })
      .populate("optionId")
      .exec();
    console.log("Puntos del bloque: " + block._id.toString(), pointsBlock);

    // Cojo solo los nombres únicos
    const optionNames = pointsBlock.map((p) => p.optionId.name);
    const uniqueOptionNames = [...new Set(optionNames)];
    //console.log(uniqueOptionNames); // ['Entusiasta', 'Rapido']
    // Lo que se va a puntuar
    //console.log('Opción a puntuar ' + infoOption)
    // Añadir el nuevo nombre
    uniqueOptionNames.push(infoOption.name);
    const uniqueOptionNamesTrim = uniqueOptionNames.map((name) => name.trim());
    //console.log(uniqueOptionNamesTrim);
    // Lo que hay en el bloque en la categoría 3
    const optionsBlock = await Option.find({
      blockId: block._id.toString(),
      categoryId: "663df7d5fc567fca9153cae5",
    }).exec();
    //console.log('Opciones del bloque 3: ' + optionsBlock)
    // Filtro para saber cúal no se ha seleccionado del nivel 3
    const missingOptions = optionsBlock.filter(
      (option) => !uniqueOptionNamesTrim.includes(option.name.trim())
    );
    // Obtén el `_id` del primer elemento faltante (o todos)
    const missingIds = missingOptions.map((option) => option._id);

    //console.log(missingIds);
    const optionWithOutSelection = missingIds.toString();
    const point = new Point({
      gameId: game,
      optionId: optionWithOutSelection,
      userId: user,
      value: -1,
    });
    await point.save();
  }

  try {
    const point = new Point({
      gameId: game,
      optionId: option,
      userId: user,
      value: value,
    });
    await point.save();
    res.status(200).json({ game, option, user, point });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getPointsByGame = async (req, res) => {
  const gameId = req.query.game;

  try {
    const points = await Point.find({ gameId })
      .populate("userId optionId")
      .exec();

    if (!points.length) {
      return res.status(404).json({ message: "No points found for this game." });
    }

    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};