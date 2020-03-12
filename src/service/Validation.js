import * as Yup from "yup";

export const questionValidationSchema = Yup.object().shape({
    question: Yup.string()
      .min(2, "Kysymyksen täytyy sisältää vähintään kaksi merkkiä.")
      .max(255, "Kysymys ei voi olla pidempi kuin 255 merkkiä.")
      .required("Kirjoita uusi kysymys."),
    correct_answer: Yup.string()
      .min(2, "Vastauksen täytyy sisältää vähintään kaksi merkkiä.")
      .max(255, "Vastaus ei voi olla pidempi kuin 255 merkkiä.")
      .required("Anna oikea vastaus"),
    wrong_answer: Yup.array()
        .of(
            Yup.string()
            .min(2, "Vastauksen täytyy sisältää vähintään kaksi merkkiä.")
            .max(255, "Vastaus ei voi olla pidempi kuin 255 merkkiä.")
            .required("Väärä vastaus ei voi olla tyhjä")
        )
  });

  export const quizValidationSchema = Yup.object().shape({
    name: Yup.string().required("Tentillä täytyy olla nimi"),
    questionCount: Yup.boolean(),
    number: Yup.number().when("questionCount", {
      is: true,
      then: Yup.number()
        .positive("Numeron täytyy olla positiivinen luku ja suurempi kuin 0")
        .integer("Numeron täytyy olla kokonaisluku")
        .lessThan(10001, "Luku saa olla enintään 10000")
    })
  });

export const loginSchema = Yup.object().shape({
  login: Yup.string().required("Käytä s-postia kirjautuaksesi sisään."),
  password: Yup.string().required("Salasana ei voi olla tyhjä.")
});