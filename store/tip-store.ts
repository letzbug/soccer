import { create } from 'zustand';
import { createClient } from '@/lib/supabase-browser';

type Tip = {
  home: number;
  away: number;
};

type TipState = {
  draft: Record<string, Tip>;
  loadTips: () => Promise<void>;
  setTip: (id: string, home: number, away: number) => Promise<void>;
  clear: () => void;
};

export const useTipStore = create<TipState>((set) => ({
  draft: {},

  loadTips: async () => {
    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from('predictions')
      .select('match_id, predicted_home, predicted_away')
      .eq('user_id', user.id);

    if (error || !data) return;

    const tips: Record<string, Tip> = {};

    data.forEach((tip) => {
      tips[tip.match_id] = {
        home: tip.predicted_home,
        away: tip.predicted_away
      };
    });

    set({ draft: tips });
  },

  setTip: async (id, home, away) => {
    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      alert('Bitte zuerst einloggen.');
      window.location.href = '/auth/login';
      return;
    }

    const { error } = await supabase.from('predictions').upsert(
      {
        user_id: user.id,
        match_id: id,
        predicted_home: home,
        predicted_away: away,
        updated_at: new Date().toISOString()
      },
      {
        onConflict: 'user_id,match_id'
      }
    );

    if (error) {
      alert('Tipp konnte nicht gespeichert werden.');
      console.error(error);
      return;
    }

    set((s) => ({
      draft: {
        ...s.draft,
        [id]: { home, away }
      }
    }));
  },

  clear: () => set({ draft: {} })
}));
