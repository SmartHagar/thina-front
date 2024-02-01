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

//  olah dtPertanyaan
const olahPertanyaan = (dtPertanyaan: any) => {
  // sort dtPertanyaan by id
  dtPertanyaan && dtPertanyaan.sort((a: any, b: any) => a.id - b.id);
  // group by indikator
  const dtPertanyaanGroup =
    dtPertanyaan &&
    dtPertanyaan.reduce((acc: any, cur: any) => {
      if (!acc[cur.indikator]) {
        acc[cur.indikator] = [];
      }
      acc[cur.indikator].push(cur);
      return acc;
    }, {});

  //    get key and value
  const dtPertanyaanGroupArr =
    dtPertanyaanGroup &&
    Object.keys(dtPertanyaanGroup).map((key: any) => {
      // sum tingkat by indikator
      const sumTingkat = dtPertanyaanGroup[key].reduce((acc: any, cur: any) => {
        return acc + cur.tingkat;
      }, 0);
      return {
        indikator: key,
        pertanyaan: dtPertanyaanGroup[key],
        totalTingkat: sumTingkat,
      };
    });

  return dtPertanyaanGroupArr;
};

export { olahJawaban, olahPertanyaan };
