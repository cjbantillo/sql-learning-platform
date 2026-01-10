import { supabase } from "../lib/supabase";

export class LessonsService {
  static async getAll(filters = {}) {
    let query = supabase.from("lessons").select("*");

    if (filters.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters.isPublished !== undefined) {
      query = query.eq("is_published", filters.isPublished);
    }

    query = query.order("order_index", { ascending: true });

    const { data, error } = await query;

    return { data, error };
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from("lessons")
      .select(
        `
        *,
        exercises (*)
      `
      )
      .eq("id", id)
      .single();

    return { data, error };
  }

  static async create(lesson) {
    const { data, error } = await supabase
      .from("lessons")
      .insert(lesson)
      .select()
      .single();

    return { data, error };
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from("lessons")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    return { data, error };
  }

  static async delete(id) {
    const { error } = await supabase.from("lessons").delete().eq("id", id);

    return { error };
  }

  static async search(query) {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(10);

    return { data, error };
  }
}
