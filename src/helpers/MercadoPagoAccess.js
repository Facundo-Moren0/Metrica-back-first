import { MercadoPagoConfig } from "mercadopago";

const configureMercadoPago = (accessToken) => {
  const client = new MercadoPagoConfig({
    accessToken: accessToken,
  });

  return client;
};

export default configureMercadoPago;