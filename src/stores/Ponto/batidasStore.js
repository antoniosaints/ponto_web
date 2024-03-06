import { defineStore } from "pinia";
import httpService from "@/services/http";
import { ref } from "vue";

function getData() {
  // Obter a data e hora atual no fuso horário UTC-3 (Horário de Brasília)
  const dataAtual = new Date();
  const options = { timeZone: "America/Sao_Paulo" };
  const dataBrasilia = dataAtual.toLocaleString("en-US", {
    ...options,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Converter a data de Horário de Brasília para o formato YYYY-MM-DD HH:ii:ss
  const [data, hora] = dataBrasilia.split(", ");
  const [horas, minutos, segundos] = hora.split(":");
  const dataFormatada = `${horas}:${minutos}`;

  return dataFormatada; // Saída: "2024-02-29 11:20:00" (para 29 de fevereiro de 2024 às 11:20:00 no Horário de Brasília)
}

export const batidasStore = defineStore("batidasStore", () => {
  const batidas = ref([]);
  const hoje = new Date().toISOString().substring(0, 10);
  const usuarioLogado = "41";

  const saveBatida = async (local) => {
    const batida = getData();
    const [pontoHoje] = await httpService(
      `batidas?data=${hoje}&usuario=${usuarioLogado}`
    );

    if (pontoHoje) {
      pontoHoje.batidas.push(batida);
      await httpService(`batidas/${pontoHoje.id}`, "PATCH", pontoHoje);
    } else {
      await httpService("batidas", "POST", {
        data: hoje,
        usuario: usuarioLogado,
        batidas: [batida],
        local: local,
      });
    }

    return batida;
  };
  return {
    saveBatida,
  };
});
