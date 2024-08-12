import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(SALT_ROUNDS));
    return hashedPassword;
};

export async function comparePassword(password, hash) {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
};