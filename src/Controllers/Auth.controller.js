import bcrypt from "bcryptjs";
import User from "../Models/auth.model.js";
import Jwt from "jsonwebtoken";

//REGISTERS USER
export const register = async (req, res) => {

          //console.log(req)
          const { uname, email, password } = req.body

          try {
                    const existingUserByEmail = await User.findOne({ email: email });
                    const existingUserByUname = await User.findOne({ uname: uname });

                    if (existingUserByEmail || existingUserByUname) {
                              return res.status(400).json({ message: "The email or username already exists" })
                    }

                    const salt = await bcrypt.genSalt(10)
                    // genSalt: Esta es una función de bcrypt que genera un salto. Un "salto" es una cadena de datos aleatorios que se utiliza como parte del proceso de hashing para asegurar que el resultado del hash sea único incluso si la entrada original (por ejemplo, la contraseña) no lo es. Esto ayuda a prevenir ataques donde se precomputan hashes para contraseñas comunes (conocidos como ataques de diccionario o de tabla arcoiris).
                    // Este número es el "cost factor" o factor de costo. Afecta cuántas veces se procesa la entrada para el hashing. Un número más alto hace que el proceso sea más lento y computacionalmente más caro, lo cual es útil para hacer que los ataques de fuerza bruta sean menos efectivos.
                    const hashedPassword = await bcrypt.hash(password, salt)

                    const user = new User({
                              uname: uname,
                              email: email,
                              password: hashedPassword,
                    });

                    await user.save();

                    res.status(200).json({ message: "You've been registered successfully" })

          } catch (error) {
                    res.status(500).json({ message: error.message });
          }
};

//LOGINS USER
export const login = async (req, res) => {
          try {
                    // LOOKS UP FOR THE DATA THAT'S BEING PUT ON THE INPUTS
                    const { identifier, password } = req.body;

                    if (!identifier) {
                              return res.status(400).json({ message: 'Falta identifier' });
                    }

                    // Check if identifier is defined and is a string
                    const isEmail = typeof identifier === 'string' && identifier.includes('@');

                    const user = isEmail
                              ? await User.findOne({ email: identifier })
                              : await User.findOne({ uname: identifier });

                    if (!user) {
                              return res.status(400).json({ message: 'Incorrect Email or username' });
                    } else {
                              const validPassword = await bcrypt.compare(password, user.password);

                              if (!validPassword) {
                                        return res.status(400).json({ message: 'Invalid password' });
                              }
                    }

                    const token = Jwt.sign(
                              {
                                        _id: user._id,
                                        username: user.uname,
                                        email: user.email,
                              },
                              process.env.TOKEN_SECRET
                    );

                    res.header({
                              'auth-token': token,
                    });

                    res.json({ token });
          } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Internal server error' });
          }
};