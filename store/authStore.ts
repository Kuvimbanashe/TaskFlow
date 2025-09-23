interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  verificationCode: string | null;
  passwordResetUserId: number | null;
  signin: (email: string, password: string) => boolean;
  signup: (fullName: string, email: string, password: string) => boolean;
  signout: () => void;
  sendVerificationCode: (email: string) => boolean;
  verifyCode: (code: string) => boolean;
  resetPassword: (newPassword: string) => boolean;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  verificationCode: null,
  passwordResetUserId: null,

  signin: (email, password) => {
    const user = mockData.users.find((u) => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  signup: (fullName, email, password) => {
    const exists = mockData.users.find((u) => u.email === email);
    if (exists) return false;

    const newUser: User = {
      id: mockData.users.length + 1,
      fullName,
      email,
      password,
    };

    mockData.users.push(newUser);
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  },

  signout: () => set({ currentUser: null, isAuthenticated: false }),

  sendVerificationCode: (email) => {
    const user = mockData.users.find((u) => u.email === email);
    if (!user) return false;

    // generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    set({ verificationCode: code, passwordResetUserId: user.id });
    alert(`Copy this Verification code : ${code}`); // simulate sending email
    return true;
  },

  verifyCode: (code) => {
    let success = false;
    set((state) => {
      if (state.verificationCode === code) {
        success = true;
        return { verificationCode: null }; // clear code after verification
      }
      return {};
    });
    return success;
  },

  resetPassword: (newPassword) => {
    const { passwordResetUserId } = useAuthStore.getState();
    if (!passwordResetUserId) return false;

    const user = mockData.users.find((u) => u.id === passwordResetUserId);
    if (!user) return false;

    user.password = newPassword;
    set({ passwordResetUserId: null });
    return true;
  },
}));
