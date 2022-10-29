export default {
  namespaced: true,
  store: {
    data: {
      statisticsItems: [
        {
          icon: 'PlayIcon',
          color: 'light-primary',
          title: 100,
          subtitle: 'Игр онлайн',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: 23,
          subtitle: 'Пользователей',
          customClass: 'mb-2 mb-xl-0',
        },
      ],
      statisticsProfit: {
        series: [
          {
            data: [0, 20, 5, 30, 15, 45],
          },
        ],
      },
    },
  },
  actions: {
    setUserCount(ctx, count) {},
  },
}
