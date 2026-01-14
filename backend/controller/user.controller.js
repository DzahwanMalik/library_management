import { User } from "../models/index.js";
import { Op } from "sequelize";

const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.create({ name });
    res.json({
      result: user,
      message: "User berhasil ditambahkan!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const search = req.query.search || null;
    const offset = (page - 1) * 10;
    const limit = 10;

    const users = await User.findAndCountAll({
      where: search && { name: { [Op.like]: `%${search}%` } },
      order: [["name", "ASC"]],
      limit,
      offset,
    });

    const totalPage = Math.ceil(users.count / limit);

    res.json({
      result: {
        data: users.rows,
        totalData: users.count,
        pagination: {
          currentPage: page,
          totalPage,
        },
      },
      message: "Berhasil mengambil data user!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    const user = await User.findOne({ where: { id: id_user } });
    res.json({
      result: user,
      message: "Berhasil mengambil data user!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { name } = req.body;

    await User.update({ name }, { where: { id: id_user } });

    const updatedUser = await User.findOne({ where: { id: id_user } });

    res.json({
      result: updatedUser,
      message: "User berhasil diperbarui!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id_user } = req.params;
    const user = await User.destroy({ where: { id: id_user } });
    res.json({
      result: user,
      message: "User berhasil dihapus!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addUser, getUsers, getUser, updateUser, deleteUser };
