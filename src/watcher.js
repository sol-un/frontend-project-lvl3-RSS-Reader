import onChange from 'on-change';
import i18next from 'i18next';
import render from './renderer.js';

const state = {
  form: {
    input: '',
    status: 'active',
    error: null,
  },
  loadingProcess: {
    status: 'idle',
    error: null,
  },
  uiState: {
    modalVisibility: 'hide',
    activeChannel: null,
    viewedPosts: new Set(),
    locale: null,
  },
  channels: [],
  posts: [],
  addedLinks: [],
  modalContents: { title: '', description: '' },
};

const watchedState = onChange(state, (path) => {
  if (path === 'uiState.locale') {
    i18next.changeLanguage(state.uiState.locale);
  }
  render(watchedState);
});

export { watchedState as default };