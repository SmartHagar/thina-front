/** @format */

const hitungRating = (dataTable: any) => {
  console.log({ dataTable });
  // join all jawaban in pertanyaan
  const dtJawaban =
    dataTable && dataTable.map((item: any) => item.jawaban).flat();

  console.log({ dtJawaban });
  // count dtJawaban by pertanyaan
  const dtJawabanGroup = dtJawaban.reduce((acc: any, cur: any) => {
    if (!acc[cur.pertanyaan.id]) {
      acc[cur.pertanyaan.id] = [];
    }
    acc[cur.pertanyaan.id].push(cur);
    return acc;
  }, {});
  console.log({ dtJawabanGroup });

  // avarage by pertanyaan
  const dtJawabanGroupArr = Object.keys(dtJawabanGroup).map((key: any) => {
    const total = dtJawabanGroup[key].reduce((acc: any, cur: any) => {
      return acc + cur.rating;
    }, 0);
    const indikator = dtJawabanGroup[key][0].pertanyaan.indikator;
    const average = total / dtJawabanGroup[key].length;
    return {
      pertanyaan_id: parseInt(key),
      average,
      indikator,
    };
  });

  console.log({ dtJawabanGroupArr });
};

export default hitungRating;
