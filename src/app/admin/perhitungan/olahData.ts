/** @format */

const customOrder = ["Kekuatan", "Kelemahan", "Peluang", "Ancaman"];

//  olah dtPertanyaan
const olahJawaban = (dtJawaban: any) => {
  const dtOlah =
    dtJawaban?.data &&
    dtJawaban.data.map((item: any) => {
      const sortedJawaban = item.jawaban
        .slice()
        .sort(
          (a: any, b: any) =>
            customOrder.indexOf(a.pertanyaan.indikator) -
            customOrder.indexOf(b.pertanyaan.indikator)
        );

      return {
        ...item,
        jawaban: sortedJawaban,
      };
    });

  return dtOlah;
};

export { olahJawaban };
