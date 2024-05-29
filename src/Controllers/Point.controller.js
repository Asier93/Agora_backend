import Point from "../Models/point.model.js";
import Category from "../Models/category.model.js";
import Option from "../Models/option.model.js";
import Jwt from "jsonwebtoken";
import Block from "../Models/block.model.js";

export const point = async (req, res) => {
  const game = req.params.game;
  const option = req.params.option;

  const token = req.header("auth-token");
  const decoded = Jwt.decode(token);
  const user = decoded._id;

  const infoOption = await Option.findOne({ _id: option }).exec();
  const block = await Block.findOne({
    _id: infoOption.blockId.toString(),
  }).exec();
  const category = await Category.findOne({
    _id: infoOption.categoryId.toString(),
  }).exec();

  let value = 0;
  if (category.name == "1") {
    value = 1;
  }
  if (category.name == "2") {
    value = 0;
  }
  if (category.name == "3") {
    value = 0;

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

    const optionNames = pointsBlock.map((p) => p.optionId.name);
    const uniqueOptionNames = [...new Set(optionNames)];

    uniqueOptionNames.push(infoOption.name);
    const uniqueOptionNamesTrim = uniqueOptionNames.map((name) => name.trim());

    const optionsBlock = await Option.find({
      blockId: block._id.toString(),
      categoryId: "663df7d5fc567fca9153cae5",
    }).exec();

    const missingOptions = optionsBlock.filter(
      (option) => !uniqueOptionNamesTrim.includes(option.name.trim())
    );
    const missingIds = missingOptions.map((option) => option._id);

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
      return res
        .status(404)
        .json({ message: "No points found for this game." });
    }

    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
