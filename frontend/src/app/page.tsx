"use client";


import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [totalEquipes, setTotalEquipes] = useState<number>(0);
  const [totalAvaliadores, setTotalAvaliadores] = useState<number>(0);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: equipesData } = await axios.get("http://localhost:3001/api/dashboard/total-equipes");
        const { data: avaliadoresData } = await axios.get("http://localhost:3001/api/dashboard/total-avaliadores");
        const { data: avaliacoesData } = await axios.get("http://localhost:3001/api/dashboard/total-avaliacoes");

        setTotalEquipes(equipesData.total);
        setTotalAvaliadores(avaliadoresData.total);
        setTotalAvaliacoes(avaliacoesData.total);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard Inicial</h1>
      <div className="flex justify-around gap-6">
        <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Total de Equipes</h2>
          <p className="text-2xl font-bold">{totalEquipes}</p>
        </div>
        <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Total de Avaliadores</h2>
          <p className="text-2xl font-bold">{totalAvaliadores}</p>
        </div>
        <div className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Total de Avaliações</h2>
          <p className="text-2xl font-bold">{totalAvaliacoes}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
