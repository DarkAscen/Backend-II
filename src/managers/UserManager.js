import { userService } from "../services/user.services.js";

class UserManager {
    async getUsers(req, res){
        try {
            this.userService.getUsers(req, res);
        } catch (error) {
            res.status(400).json({ error: "Error getting the users", details: error.message });
        }
    }

    async getUserById(req, res){
        try {
            const user = await userService.getUserById(req.params.uid);
            if (!user) {
                res.status(400).json({ error: "Error getting the user" });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(400).json({ error: "Error getting the user", details: error.message });
        }
    }

    async addUser(req, res){
        try {
            const user = await userService.addUser(req.body);

            if (!user) {
                res.status(400).json({ error: "Error adding the user" });
            } else {
                await mailService.sendMail({
                    to: user.email,
                    subject: "Welcome to Coder House",
                    html: `<h1>Welcome to Coder House</h1><p>Your username is ${user.email} and your password is ${user.password}</p>`,
                });

                res.status(201).json({ message: "User added successfully", user });
            };
        } catch (error) {
            res.status(400).json({ error: "Error adding the user", details: error.message });
        }
    }

    async updateUser(req, res){
        try {
            const { uid } = req.params;
            const { first_name, last_name, email, age, password } = req.body;

            const user = await userService.updateUser(uid, { first_name, last_name, email, age, password });
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: "Error updating the user", details: error.message });
        }
    }

    async deleteUser(req, res){
        try {
            const user = await userService.deleteUser(req.params.uid);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: "Error deleting the user", details: error.message });
        }
    }   
}

export const userManager = new UserManager();