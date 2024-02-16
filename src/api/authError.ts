import { authService } from 'firebase/firebase';
import { signOut } from 'firebase/auth';

export const authError = (code:string) => {
    switch (code) {
        case 'auth/invalid-credential':
            alert("잘못된 이메일 주소 또는 비밀번호입니다.");
            break;
        case 'auth/user-disabled':
            alert("사용이 비활성화된 계정입니다.");
          break;
        case 'auth/email-already-in-use':
            alert("이미 사용중인 계정입니다.");
          break;
        case 'auth/invalid-api-key':
          alert('여기');
          signOut(authService);
          localStorage.removeItem('token');
          //메인으로 가는거 추가해여함
          break;
        default:
            alert("로그인 실패");
      }
}
