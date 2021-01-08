var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hola");
});

router.get("/user/:name", async (req, res) => {
  try {
    const user = await axios.get(
      `https://api.github.com/users/${req.params.name}`
    );

    console.log(req.query);
    const pokemones = req.query.pokemon.split(",");

    console.log(pokemones);

    // este código busca en la poke api un array de pokemones, cuando vuelve
    // la data de todos ahí recién nos da el return

    const pokeData = await Promise.all(
      pokemones.map(async pokemon => {
        const pokeData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        return pokeData.data;
      })
    );

    // const pokemon = await axios.get(
    //   `https://pokeapiz.co/api/v2/pokemon/${req.params.pokemon}`
    // );

    console.log(pokeData, "aaa");

    const dataToSend = {
      username: user.data.login,
      name: user.data.name,
      favPokes: pokeData
    };

    console.log(dataToSend);

    // console.log(user.data);
    // console.log(pokemon.data);

    res.status(200).json(dataToSend);
  } catch (e) {
    res.sendStatus(400);
  }

  // console.log(axios.get(`https://api.github.com/users/${req.params.name}`));

  // axios
  //   .get(`https://api.github.com/users/${req.params.name}`)
  //   .then(user => {
  //     console.log(user.data);
  //     res.sendStatus(200);
  //   })
  //   .catch(error => {
  //     res.status(400).send("Usuario no encontrado");
  //   });
  // // console.log(user.data);
});

module.exports = router;
