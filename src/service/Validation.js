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