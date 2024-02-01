/** @format */
"use client";
import React, { FC, useEffect, useState } from "react";
import "../../../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
type Props = {
  dtTotal: any;
};

const Total: FC<Props> = ({ dtTotal }) => {
  const [dtX, setDtX] = useState<number>();
  const [dtY, setDtY] = useState<number>();
  console.log({ dtTotal });
  const hitungXY = () => {
    // Ambil nilai bxr indikator Kekuatan
    const kekuatanBxr =
      dtTotal.find((item: any) => item.indikator === "Kekuatan")?.bxr || 0;

    // Ambil nilai bxr indikator Kelemahan
    const kelemahanBxr =
      dtTotal.find((item: any) => item.indikator === "Kelemahan")?.bxr || 0;

    // Ambil nilai bxr indikator Peluang
    const peluangBxr =
      dtTotal.find((item: any) => item.indikator === "Peluang")?.bxr || 0;

    // Ambil nilai bxr indikator Ancaman
    const ancamanBxr =
      dtTotal.find((item: any) => item.indikator === "Ancaman")?.bxr || 0;

    const sw = parseFloat((kekuatanBxr - kelemahanBxr).toFixed(2));
    const ot = parseFloat((peluangBxr - ancamanBxr).toFixed(2));
    setDtX(sw);
    setDtY(ot);
  };

  useEffect(() => {
    hitungXY();
  }, [dtTotal]);

  const xDomain = [-0.5, 0.5];
  const yDomain = [-0.5, 0.5];
  const xAxisOn0 = true;
  const yAxisOn0 = true;
  const verticalTickValues: string | any[] = [];
  const horizontalTickValues = [0];

  const data = [
    { x: dtX, y: 0 },
    { x: dtX, y: dtY },
    { x: 0, y: dtY },
  ];

  return (
    <div>
      <div>
        <p>Total S - W = {dtX} X</p>
        <p>Total O - T = {dtY} Y</p>
      </div>
      <div className="flex flex-col w-full items-center">
        <h3>Diagram SWOT</h3>
        <div>
          <XYPlot width={400} height={400} {...{ xDomain, yDomain }}>
            {!verticalTickValues || verticalTickValues.length ? (
              <VerticalGridLines tickValues={verticalTickValues} />
            ) : null}
            {!horizontalTickValues || horizontalTickValues.length ? (
              <HorizontalGridLines tickValues={horizontalTickValues} />
            ) : null}
            <XAxis on0={xAxisOn0} />
            <YAxis on0={yAxisOn0} />
            {/* ignore error */}
            {/* @ts-ignore */}
            <LineSeries data={data} />
          </XYPlot>
        </div>
      </div>
    </div>
  );
};

export default Total;
