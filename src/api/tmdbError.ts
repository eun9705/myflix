export const tmdbError = (code:number) => {
    switch (code) {
        case 7:
            alert('잘못된 요청입니다.');
            break;
        default:
            alert('잠시 후에 다시 시도해주세요.')
      }
}