/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cartoon-yellow': '#FFE234',
        'cartoon-orange': '#FF8C00',
        'cartoon-red': '#FF3B30',
        'cartoon-blue': '#007AFF',
        'cartoon-cyan': '#00C8FF',
        'cartoon-green': '#34C759',
        'cartoon-purple': '#AF52DE',
        'cartoon-pink': '#FF2D92',
        'cartoon-dark': '#1A1A2E',
        'cartoon-bg': '#87CEEB',
        'cartoon-ground': '#4CAF50',
      },
      fontFamily: {
        display: ['"Bangers"', 'cursive'],
        body: ['"Fredoka One"', 'cursive'],
        mono: ['"Courier New"', 'monospace'],
      },
      boxShadow: {
        cartoon: '4px 4px 0px #000000',
        'cartoon-sm': '2px 2px 0px #000000',
        'cartoon-lg': '6px 6px 0px #000000',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        bounce_slow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        attack_player: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(80px)' },
          '100%': { transform: 'translateX(0)' },
        },
        attack_robot: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-80px)' },
          '100%': { transform: 'translateX(0)' },
        },
        pop_in: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '70%': { transform: 'scale(1.2) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slide_up: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        damage_float: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-60px)', opacity: '0' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        bounce_slow: 'bounce_slow 2s ease-in-out infinite',
        attack_player: 'attack_player 0.4s ease-in-out',
        attack_robot: 'attack_robot 0.4s ease-in-out',
        pop_in: 'pop_in 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)',
        float: 'float 3s ease-in-out infinite',
        slide_up: 'slide_up 0.4s ease-out',
        damage_float: 'damage_float 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
}
