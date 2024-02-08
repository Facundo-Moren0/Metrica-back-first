export const validateSchema = (schema) => (req, res, next) => {
    try {/*
      const {stock , precio , puntaje} = req.body
      /*thunderClient entrega los valores numericos como str, por eso usamos converse */
      /*if(stock && precio){
        const converse = {...req.body,stock:Number(stock),precio:Number(precio)}
        schema.parse(converse);
        next();
      }

      if(puntaje){
        const converse = {...req.body,puntaje:Number(puntaje)}
        schema.parse(converse);
        console.log(converse)
        //next();
      }*/
      
      schema.parse(req.body);
      next();
      
    } catch (error) {

        return res
          .status(400)
          .json({ message: error.errors.map((error) => error.message) });
      }
  };