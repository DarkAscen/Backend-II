import { userModel } from "../models/user.model.js";

class UserService {
    static async getUsers(req, res){
        return await userModel.find();
    }

    static async getUserById(req, res){
        return await userModel.findById(req.params.uid);
    }

    static async addUser(req, res){
        return await userModel.create(req.body);
    }

    static async updateUser(req, res){
        const { uid } = req.params;
        const { first_name, last_name, email, age, password } = req.body;

        return await userModel.findByIdAndUpdate(uid, { first_name, last_name, email, age, password });
    }

    static async deleteUser(req, res){
        return await userModel.findByIdAndDelete(req.params.uid);
    }   
}

export const userService = new UserService();