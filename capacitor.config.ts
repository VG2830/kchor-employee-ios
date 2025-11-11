import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ekarigar.kaamchor_emp',
  appName: 'kaamChorEmp',
  webDir: 'www',
   plugins: {
    // EdgeToEdge: {
    //   backgroundColor: "#0c0b0bff",
    // },
   
  },
   "ios": {
    "contentInset": "always"
  }
  
};

export default config;
