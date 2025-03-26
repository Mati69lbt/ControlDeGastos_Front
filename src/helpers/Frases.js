// cSpell: ignore  frasesMotivacionales

const frasesMotivacionales = [
  "Todo llega para quien sabe esperar con paciencia y trabaja con constancia.",
  "La paciencia no es la capacidad de esperar, sino cómo actúas mientras esperas.",
  "Lo mejor de la vida no se da de inmediato, sino a su debido tiempo.",
  "Las cosas buenas llegan a quienes saben esperar, pero las mejores llegan a quienes no dejan de luchar.",
  "El tiempo que pasas esperando no es tiempo perdido si sigues avanzando internamente.",
  "A veces, la espera es el proceso necesario para recibir lo que realmente mereces.",
  "No desesperes en la espera, porque el crecimiento sucede en el silencio.",
  "La paciencia es amarga, pero su fruto es dulce.",
  "No se trata solo de esperar, sino de confiar en que lo mejor está por venir.",
  "Quien aprende a esperar, aprende a ganar.",
  "El bambú tarda años en crecer, pero cuando lo hace, se eleva imparable. Sé como el bambú.",
  "Los sueños no se cumplen de la noche a la mañana, pero cada día de espera te acerca un poco más.",
  "La espera no es un tiempo perdido, sino una oportunidad para prepararte para lo que viene.",
  "La naturaleza nos enseña que todo tiene su temporada. Confía en el proceso.",
  "El éxito llega a quienes tienen la paciencia de sembrar y la fe de cosechar.",
  "A veces, lo que estás esperando no llega porque algo mejor está en camino.",
  "No cuentes los minutos, haz que los minutos cuenten mientras esperas.",
  "La espera es el arte de mantener la fe cuando la meta aún no se ve.",
  "El río no se apresura, pero siempre llega a su destino.",
  "Cada segundo de espera es una oportunidad para crecer más fuerte.",
];

const frase = () =>
  frasesMotivacionales[Math.floor(Math.random() * frasesMotivacionales.length)];

export default frase;
