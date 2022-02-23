import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const Sid = process.env.$twilio_id;
const token = process.env.$twilio_token;

const client = twilio(Sid, token);

try {
  const message = await client.messages.create({
    body: "Hola, estoy enviando un SMS para poder hacer Fishing.",
    from: "+19033205689",
    to: "+541159758280",
  });
  console.log(message);
} catch (err) {
  console.error(err);
}
