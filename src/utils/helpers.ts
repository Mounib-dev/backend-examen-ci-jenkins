import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

const SECRET_KEY: Secret = <Secret>"J!]-XV#*8fN&97SwjC8:5)rA_U6tmcs}~^z";

export const add = (a: number, b: number): number => {
  return a + b;
};

export const setLast = (usersNumber: number, groupsNumber: number) => {
  let A: boolean;
  let B: boolean;

  if (usersNumber % groupsNumber === 0) {
    A = false;
    B = false;
  } else {
    A = false;
    B = true;
  }

  return { A, B };
};

/**
 * Generate a JWT token for authenticated user
 * @param userId - The user ObjectID retrieved from the Database
 * @param role - Role of the current User
 * @returns string : the generated JWT Token
 */
export const generateToken = (
  userId: string,
  role: string,
  firstname: string,
  lastname: string
): string => {
  const payload = {
    sub: userId,
    role: role,
    firstname: firstname,
    lastname: lastname,
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: 60 * 20,
  });
  return token;
};
