/** @format */

const hitungRating = (dataTable: any, dtPertanyaan: any) => {
  // join all jawaban in pertanyaan
  const dtJawaban =
    dataTable && dataTable.map((item: any) => item.jawaban).flat();

  // count dtJawaban by pertanyaan
  const dtJawabanGroup = dtJawaban.reduce((acc: any, cur: any) => {
    if (!acc[cur.pertanyaan.id]) {
      acc[cur.pertanyaan.id] = [];
    }
    acc[cur.pertanyaan.id].push(cur);
    return acc;
  }, {});

  // avarage by pertanyaan
  const dtJawabanGroupArr = Object.keys(dtJawabanGroup).map((key: any) => {
    const total = dtJawabanGroup[key].reduce((acc: any, cur: any) => {
      return acc + cur.rating;
    }, 0);
    const indikator = dtJawabanGroup[key][0].pertanyaan.indikator;
    const average = total / dtJawabanGroup[key].length;
    const tingkat = parseFloat(dtJawabanGroup[key][0].pertanyaan.tingkat);
    // sum tingkat
    const totalTingkat = dtPertanyaan.find(
      (item: any) => item.indikator === indikator
    )?.totalTingkat;
    const bobot = parseFloat((tingkat / totalTingkat).toFixed(3));
    const bxr = average * bobot;
    return {
      pertanyaan_id: parseInt(key),
      average,
      indikator,
      tingkat,
      bobot,
      bxr,
    };
  });

  // sum bobot by indikator
  const sumBobotByIndikator = dtJawabanGroupArr.reduce((acc: any, cur: any) => {
    if (!acc[cur.indikator]) {
      acc[cur.indikator] = 0;
    }
    acc[cur.indikator] += cur.bobot;
    return acc;
  }, {});

  // get key and value
  const dtJawabanGroupArrValue = Object.keys(sumBobotByIndikator).map(
    (key: any) => {
      return {
        indikator: key,
        bobot: parseFloat(sumBobotByIndikator[key].toFixed(1)),
      };
    }
  );

  // sum bxr by indikator
  const sumBxrByIndikator = dtJawabanGroupArr.reduce((acc: any, cur: any) => {
    if (!acc[cur.indikator]) {
      acc[cur.indikator] = 0;
    }
    acc[cur.indikator] += cur.bxr;
    return acc;
  }, {});

  // get key and value
  const dtJawabanGroupArrValueBxr = Object.keys(sumBxrByIndikator).map(
    (key: any) => {
      return {
        indikator: key,
        bxr: parseFloat(sumBxrByIndikator[key].toFixed(1)),
      };
    }
  );

  console.log({
    dtJawabanGroupArrValueBxr,
  });

  return {
    rataRata: dtJawabanGroupArr,
    bobotIndikator: dtJawabanGroupArrValue,
    bxrIndikator: dtJawabanGroupArrValueBxr,
  };
};

export default hitungRating;
