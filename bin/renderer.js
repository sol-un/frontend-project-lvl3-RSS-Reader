import $ from 'jquery';

const renderActiveChannel = (id) => {
  $('.nav-link').each((_i, el) => $(el).removeClass('active'));
  $(`a#${id}.nav-link`).addClass('active');
  $('.tab-pane').each((_i, el) => $(el).removeClass('active'));
  $(`div#${id}.tab-pane`).addClass('active');
};

const renderCard = ({
  title, description, link, creator, pubDate,
}) => {
  const card = document.createElement('div');
  $(card).addClass('card');

  const cardBody = document.createElement('div');
  $(cardBody)
    .addClass('card-body')
    .appendTo(card);

  const cardTitle = document.createElement('h5');
  $(cardTitle)
    .addClass('mb-2')
    .text(title)
    .appendTo(cardBody);

  if (creator) {
    const cardSubtitle = document.createElement('h6');
    $(cardSubtitle).addClass('card-subtitle')
      .addClass('mb-3')
      .addClass('text-muted')
      .text(`by ${creator}`)
      .appendTo(cardBody);
  }

  const cardDescription = document.createElement('p');
  $(cardDescription)
    .text(description)
    .appendTo(cardBody);

  const cardDate = document.createElement('p');
  $(cardDate)
    .append(`<i>Published on ${new Date(pubDate).toLocaleDateString()}</i>`)
    .appendTo(cardBody);

  const cardLink = document.createElement('a');
  $(cardLink)
    .attr('href', link)
    .text('View full article...')
    .appendTo(cardBody);

  return card;
};

const renderContents = (item, articles) => {
  const filteredArticles = articles.filter(({ id }) => id === item.id);
  const div = document.createElement('div');
  $(div)
    .attr('id', item.id)
    .addClass('tab-pane')
    .appendTo($('.tab-content'));

  filteredArticles.reduce((acc, article) => {
    const card = renderCard(article);
    acc.append(card);
    return acc;
  }, $(div));

  return div;
};

const renderTab = (acc, { id, title }, state) => {
  const li = document.createElement('li');
  $(li)
    .addClass('nav-item')
    .appendTo(acc);

  const a = document.createElement('a');
  $(a).addClass('nav-link')
    .data('toggle', 'tab')
    .attr('href', `#${title}`)
    .attr('id', id)
    .text(title)
    .on('click', (e) => {
      e.preventDefault();
      const activeChannelId = $(e.target).attr('id');
      Object.assign(state, { activeChannelId });
    })
    .appendTo(li);

  return li;
};

export default (state) => {
  const $mount = $('#channelNav');
  const { activeChannelId, channels, articles } = state;

  $('input').val('');

  if (channels.length === 0) {
    return $mount.append('<div class="mt-4 text-center"><i>No channels have been added yet...</i></div>');
  }

  $mount.empty();

  const ul = document.createElement('ul');
  $(ul)
    .attr('id', 'myTab')
    .addClass('nav nav-tabs')
    .appendTo($mount);

  const div = document.createElement('div');
  $(div)
    .addClass('tab-content')
    .appendTo($mount);

  channels.reduce((acc, item) => {
    const tab = renderTab(acc, item, state);
    renderContents(item, articles);

    acc.append(tab);
    return acc;
  }, $(ul));

  return renderActiveChannel(activeChannelId);
};