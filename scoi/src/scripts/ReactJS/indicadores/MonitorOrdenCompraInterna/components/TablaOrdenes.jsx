import React, { useState } from "react";

import CaveceraTabla from './CaveceraTabla'
import Ordenes from './EstablecimientoTabla'

export default function TablaOrdenes({ liata, optenerDetale }) {
  return liata.length > 0 ? (
    <div class="panel-body">
      <label>{liata.length} Ordenes</label>
      <div
        style={{
          height: "650px",
          border: "solid 1px #D8D8D0",
          overflow: "auto"
        }}
      >
        <table class="table table-condensed table-bordered">
                  <CaveceraTabla lista={liata} />
                  <Ordenes lista={liata} optenerDetale={optenerDetale} />
        </table>
      </div>
    </div>
  ) : (
    <div
      class="bg-warning"
      style={{
        height: "60px",
        color: "#BDC104",
        justifyContent: "center",
        padding: "10px"
      }}
    >
      <h3> Sin Ordenes A Mostrar... </h3>
    </div>
  );
}

