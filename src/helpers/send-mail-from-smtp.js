import transporter from "./initialize-nodemailer.js";

const msgBienvenida = `¡Bienvenido a METRICA, tu destino digital para experiencias de compra inigualables!

En METRICA, nos enorgullece ofrecerte una amplia selección de productos de alta calidad, las últimas tendencias y tecnologías, y una experiencia de compra que supera tus expectativas. Desde la comodidad de tu hogar hasta la palma de tu mano, estamos aquí para brindarte un acceso fácil y conveniente a productos que hacen la diferencia en tu vida diaria.

Gracias por elegir METRICA como tu destino de compras en línea. Estamos emocionados de tenerte como parte de nuestra comunidad digital. ¡Bienvenido a una experiencia de compra sin límites!

Atentamente,
El equipo METRICA`



export const sendMailFromSmtp = async (destination,content)=>{
    
    const info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${process.env.USER_GMAIL}>`,
        to: `${destination}`,
        subject: "METRICA 🛠️", 
        //text: "Hello world?",
        html: `<b>${content || msgBienvenida}</b>`,
    });
};