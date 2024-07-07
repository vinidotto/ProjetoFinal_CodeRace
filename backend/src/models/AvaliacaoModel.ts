import pool from "../database/dbConfig";

interface Avaliacao {
  id?: number;
  avaliador_id: number;
  equipe_id: number;
  notas: {
    originalidade: number;
    impacto: number;
    execucao: number;
    apresentacao: number;
    viabilidade: number;
  };
}

class AvaliacaoModel {
  async create(avaliacao: Avaliacao): Promise<Avaliacao> {
    const { avaliador_id, equipe_id, notas } = avaliacao;
    const result = await pool.query(
      "INSERT INTO avaliacoes (avaliador_id, equipe_id, notas) VALUES ($1, $2, $3) RETURNING *",
      [avaliador_id, equipe_id, notas]
    );
    return result.rows[0];
  }

  async findAll(filters: { avaliadorId?: number; equipeId?: number } = {}): Promise<Avaliacao[]> {
    const { avaliadorId, equipeId } = filters;
    let query = "SELECT * FROM avaliacoes WHERE 1=1";
    const values: any[] = [];

    if (avaliadorId !== undefined) {
      query += " AND avaliador_id = $1";
      values.push(avaliadorId);
    }

    if (equipeId !== undefined) {
      query += ` AND equipe_id = $${values.length + 1}`;
      values.push(equipeId);
    }

    try {
      const result = await pool.query(query, values);
      return result.rows || [];
    } catch (error) {
      console.error("Error finding Avaliacoes:", error);
      throw error;
    }
  }

  async findById(id: number): Promise<Avaliacao | null> {
    const result = await pool.query("SELECT * FROM avaliacoes WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async update(id: number, avaliacao: Partial<Avaliacao>): Promise<Avaliacao | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let query = "UPDATE avaliacoes SET ";

    Object.keys(avaliacao).forEach((key, index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push((avaliacao as any)[key]);
    });

    query +=
      fields.join(", ") +
      " WHERE id = $" +
      (fields.length + 1) +
      " RETURNING *";
    values.push(id);

    try {
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error updating Avaliacao:", error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM avaliacoes WHERE id = $1", [id]);
  }
}

export { Avaliacao, AvaliacaoModel };
