import twilio from "twilio";

const Sid = "ACf93129f101ff3e7ecb0416478235ee55";
const token = "58eee4954ce752c6d58181fa236e597f";

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
