import { createStore } from 'vuex'

import common from '@/store/modules/common'
import session from '@/store/modules/session'
import kanban from '@/store/modules/kanban'
import chat from '@/store/modules/chat'

export const store = createStore({
  modules: {
    common,
    session,
    kanban,
    chat,
  },
});