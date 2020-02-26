module.exports = {
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		screens: {
			xs: '480px',
			sm: '600px',
			md: '960px',
			lg: '1280px',
			xl: '1440px'
		},
		colors: {
			transparent: 'transparent',
			black: '#000',
            white: '#fff',
            tan: '#e2c7ac',
			gray: {
				100: '#f7fafc',
				200: '#edf2f7',
				300: '#e2e8f0',
				400: '#cbd5e0',
				500: '#a0aec0',
                600: '#5a4b4a',
				700: '#4a5568',
				800: '#2d3748',
                900: '#130000',
			},
			red: {
				100: '#fff5f5',
				200: '#fed7d7',
				300: '#feb2b2',
				400: '#fc8181',
				500: '#f56565',
                600: '#c1442e',
                700: '#6e0605',
				800: '#9b2c2c',
				900: '#742a2a',
			},
			orange: {
				100: '#fffaf0',
				200: '#feebc8',
				300: '#fbd38d',
				400: '#f6ad55',
				500: '#ed8936',
				600: '#dd6b20',
				700: '#c05621',
				800: '#9c4221',
				900: '#7b341e',
			},
			yellow: {
				100: '#fffff0',
                200: '#5d441c',
				300: '#faf089',
				400: '#f6e05e',
				500: '#ecc94b',
				600: '#d69e2e',
				700: '#b7791f',
				800: '#975a16',
				900: '#744210',
			},
			green: {
				100: '#f0fff4',
				200: '#c6f6d5',
				300: '#9ae6b4',
				400: '#68d391',
				500: '#48bb78',
				600: '#38a169',
				700: '#2f855a',
                800: '#452e26',
				900: '#22543d',
			},
			teal: {
				100: '#e6fffa',
				200: '#b2f5ea',
				300: '#81e6d9',
				400: '#4fd1c5',
				500: '#38b2ac',
				600: '#319795',
				700: '#2c7a7b',
				800: '#285e61',
				900: '#234e52',
			},
			blue: {
				100: '#ebf8ff',
				200: '#bee3f8',
				300: '#90cdf4',
				400: '#63b3ed',
				500: '#4299e1',
				600: '#3182ce',
				700: '#2b6cb0',
				800: '#2c5282',
				900: '#2a4365',
			},
			indigo: {
				100: '#ebf4ff',
				200: '#c3dafe',
				300: '#a3bffa',
				400: '#7f9cf5',
				500: '#667eea',
				600: '#5a67d8',
				700: '#4c51bf',
				800: '#434190',
				900: '#3c366b',
			},
			purple: {
				100: '#faf5ff',
				200: '#e9d8fd',
				300: '#d6bcfa',
				400: '#b794f4',
				500: '#9f7aea',
				600: '#805ad5',
				700: '#6b46c1',
				800: '#553c9a',
				900: '#44337a',
			},
			pink: {
				100: '#fff5f7',
				200: '#fed7e2',
				300: '#fbb6ce',
				400: '#f687b3',
				500: '#ed64a6',
				600: '#d53f8c',
				700: '#b83280',
				800: '#97266d',
				900: '#702459',
			}
		},
		spacing: {
			px: '1px',
			'0': '0',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'14': '3.5rem',
			'16': '4rem',
			'18': '4.5rem',
			'20': '5rem',
			'22': '5.5rem',
			'24': '6rem',
			'26': '6.5rem',
			'28': '7rem',
			'30': '7.5rem',
			'32': '8rem',
			'34': '8.5rem',
			'36': '9rem',
			'38': '9.5rem',
			'40': '10rem',
			'42': '10.5rem',
			'44': '11rem',
			'46': '11.5rem',
			'48': '12rem',
			'50': '12.5rem',
			'52': '13rem',
			'54': '13.5rem',
			'56': '14rem',
			'58': '14.5rem',
			'60': '15rem',
			'62': '15.5rem',
			'64': '16rem',
			'66': '16.5rem',
			'68': '17rem',
			'70': '17.5rem',
			'72': '18rem',
			'74': '18.5rem',
			'76': '19rem',
			'78': '19.5rem',
			'80': '20rem',
			'82': '20.5rem',
			'84': '21rem'
		},
		backgroundColor: theme => theme('colors'),
		backgroundPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top'
		},
		backgroundSize: {
			auto: 'auto',
			cover: 'cover',
			contain: 'contain'
		},
		borderColor: theme => ({
			...theme('colors'),
			default: theme('colors.gray.300', 'currentColor')
		}),
		borderRadius: {
			none: '0',
			sm: '0.125rem',
			default: '0.25rem',
			lg: '0.5rem',
			full: '9999px'
		},
		borderWidth: {
			default: '1px',
			'0': '0',
			'2': '2px',
			'4': '4px',
			'8': '8px',
			'12': '12px',
			'16': '16px'
		},
		boxShadow: { //Based on Google Elevation Documentation
			0: 'none',
			1: '0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12)',
			2: '0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)',
			3: '0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12)',
			4: '0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12)',
			5: '0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12)',
			6: '0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12)',
			7: '0 4px 5px -2px rgba(0, 0, 0, .2), 0 7px 10px 1px rgba(0, 0, 0, .14), 0 2px 16px 1px rgba(0, 0, 0, .12)',
			8: '0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)',
			9: '0 5px 6px -3px rgba(0, 0, 0, .2), 0 9px 12px 1px rgba(0, 0, 0, .14), 0 3px 16px 2px rgba(0, 0, 0, .12)',
			10: '0 6px 6px -3px rgba(0, 0, 0, .2), 0 10px 14px 1px rgba(0, 0, 0, .14), 0 4px 18px 3px rgba(0, 0, 0, .12)',
			11: '0 6px 7px -4px rgba(0, 0, 0, .2), 0 11px 15px 1px rgba(0, 0, 0, .14), 0 4px 20px 3px rgba(0, 0, 0, .12)',
			12: '0 7px 8px -4px rgba(0, 0, 0, .2), 0 12px 17px 2px rgba(0, 0, 0, .14), 0 5px 22px 4px rgba(0, 0, 0, .12)',
			13: '0 7px 8px -4px rgba(0, 0, 0, .2), 0 13px 19px 2px rgba(0, 0, 0, .14), 0 5px 24px 4px rgba(0, 0, 0, .12)',
			14: '0 7px 9px -4px rgba(0, 0, 0, .2), 0 14px 21px 2px rgba(0, 0, 0, .14), 0 5px 26px 4px rgba(0, 0, 0, .12)',
			15: '0 8px 9px -5px rgba(0, 0, 0, .2), 0 15px 22px 2px rgba(0, 0, 0, .14), 0 6px 28px 5px rgba(0, 0, 0, .12)',
			16: '0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12)',
			17: '0 8px 11px -5px rgba(0, 0, 0, .2), 0 17px 26px 2px rgba(0, 0, 0, .14), 0 6px 32px 5px rgba(0, 0, 0, .12)',
			18: '0 9px 11px -5px rgba(0, 0, 0, .2), 0 18px 28px 2px rgba(0, 0, 0, .14), 0 7px 34px 6px rgba(0, 0, 0, .12)',
			19: '0 9px 12px -6px rgba(0, 0, 0, .2), 0 19px 29px 2px rgba(0, 0, 0, .14), 0 7px 36px 6px rgba(0, 0, 0, .12)',
			20: '0 10px 13px -6px rgba(0, 0, 0, .2), 0 20px 31px 3px rgba(0, 0, 0, .14), 0 8px 38px 7px rgba(0, 0, 0, .12)',
			21: '0 10px 13px -6px rgba(0, 0, 0, .2), 0 21px 33px 3px rgba(0, 0, 0, .14), 0 8px 40px 7px rgba(0, 0, 0, .12)',
			22: '0 10px 14px -6px rgba(0, 0, 0, .2), 0 22px 35px 3px rgba(0, 0, 0, .14), 0 8px 42px 7px rgba(0, 0, 0, .12)',
			23: '0 11px 14px -7px rgba(0, 0, 0, .2), 0 23px 36px 3px rgba(0, 0, 0, .14), 0 9px 44px 8px rgba(0, 0, 0, .12)',
			24: '0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12)'
		},
		container: {},
		cursor: {
			auto: 'auto',
			default: 'default',
			pointer: 'pointer',
			wait: 'wait',
			text: 'text',
			move: 'move',
			'not-allowed': 'not-allowed'
		},
		fill: {
			current: 'currentColor'
		},
		flex: {
			'1': '1 1 0%',
			auto: '1 1 auto',
			initial: '0 1 auto',
			none: 'none'
		},
		flexGrow: {
			'0': '0',
			default: '1'
		},
		flexShrink: {
			'0': '0',
			default: '1'
		},
		fontFamily: {
			sans: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
				'"Noto Color Emoji"'
			],
			serif: [
				'Georgia',
				'Cambria',
				'"Times New Roman"',
				'Times',
				'serif'
			],
			mono: [
				'Menlo',
				'Monaco',
				'Consolas',
				'"Liberation Mono"',
				'"Courier New"',
				'monospace'
			]
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem'
		},
		fontWeight: {
			hairline: '100',
			thin: '200',
			light: '300',
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
			extrabold: '800',
			black: '900'
		},
		height: theme => ({
			auto: 'auto',
			...theme('spacing'),
			full: '100%',
			screen: '100vh'
		}),
		inset: {
			'0': '0',
			auto: 'auto'
		},
		letterSpacing: {
			tighter: '-0.05em',
			tight: '-0.025em',
			normal: '0',
			wide: '0.025em',
			wider: '0.05em',
			widest: '0.1em'
		},
		lineHeight: {
			none: '1',
			tight: '1.25',
			snug: '1.375',
			normal: '1.5',
			relaxed: '1.625',
			loose: '2'
		},
		listStyleType: {
			none: 'none',
			disc: 'disc',
			decimal: 'decimal'
		},
		margin: (theme, { negative }) => ({
			auto: 'auto',
			...theme('spacing'),
			...negative(theme('spacing'))
		}),
		maxHeight: theme => ({
			'0': '0',
			...theme('spacing'),
			full: '100%',
			screen: '100vh'
		}),
		maxWidth: theme => ({
			...theme('spacing'),
			xs: '20rem',
			sm: '24rem',
			md: '28rem',
			lg: '32rem',
			xl: '36rem',
			'2xl': '42rem',
			'3xl': '48rem',
			'4xl': '56rem',
			'5xl': '64rem',
			'6xl': '72rem',
			full: '100%',
			'screen-95': '95vw',
			screen: '100vw'
		}),
		minHeight: theme => ({
			'0': '0',
			...theme('spacing'),
			full: '100%',
			screen: '100vh'
		}),
		minWidth: theme => ({
			'0': '0',
			...theme('spacing'),
			full: '100%',
			screen: '100vw'
		}),
		objectPosition: {
			bottom: 'bottom',
			center: 'center',
			left: 'left',
			'left-bottom': 'left bottom',
			'left-top': 'left top',
			right: 'right',
			'right-bottom': 'right bottom',
			'right-top': 'right top',
			top: 'top'
		},
		opacity: {
			'0': '0',
			'10': '0.10',
			'15': '0.15',
			'20': '0.20',
			'25': '0.25',
			'30': '0.30',
			'35': '0.35',
			'40': '0.40',
			'45': '0.45',
			'50': '0.50',
			'55': '0.55',
			'60': '0.60',
			'65': '0.65',
			'70': '0.70',
			'75': '0.75',
			'80': '0.80',
			'85': '0.85',
			'90': '0.90',
			'95': '0.95',
			'100': '1'
		},
		order: {
			first: '-9999',
			last: '9999',
			none: '0',
			'1': '1',
			'2': '2',
			'3': '3',
			'4': '4',
			'5': '5',
			'6': '6',
			'7': '7',
			'8': '8',
			'9': '9',
			'10': '10',
			'11': '11',
			'12': '12'
		},
		padding: theme => theme('spacing'),
		stroke: {
			current: 'currentColor'
		},
		textColor: theme => theme('colors'),
		width: theme => ({
			auto: 'auto',
			...theme('spacing'),
			'1/2': '50%',
			'1/3': '33.33333%',
			'2/3': '66.66667%',
			'1/4': '25%',
			'2/4': '50%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/5': '60%',
			'4/5': '80%',
			'1/6': '16.66667%',
			'2/6': '33.33333%',
			'3/6': '50%',
			'4/6': '66.66667%',
			'5/6': '83.33333%',
			'1/12': '8.33333%',
			'2/12': '16.66667%',
			'3/12': '25%',
			'4/12': '33.33333%',
			'5/12': '41.66667%',
			'6/12': '50%',
			'7/12': '58.33333%',
			'8/12': '66.66667%',
			'9/12': '75%',
			'10/12': '83.33333%',
			'11/12': '91.66667%',
			full: '100%',
			screen: '100vw'
		}),
		zIndex: {
			auto: 'auto',
            top: '9999',
			'-1': '-1',
			'0': '0',
			'10': '10',
			'20': '20',
			'30': '30',
			'40': '40',
			'50': '50'
		}
	},
	variants: {
		alignContent: ['responsive'],
		alignItems: ['responsive'],
		alignSelf: ['responsive'],
		appearance: ['responsive'],
		backgroundAttachment: ['responsive'],
		backgroundColor: ['responsive', 'hover', 'focus', 'focus-within'],
		backgroundPosition: ['responsive'],
		backgroundRepeat: ['responsive'],
		backgroundSize: ['responsive'],
		borderCollapse: ['responsive'],
		borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
		borderRadius: ['responsive'],
		borderStyle: ['responsive'],
		borderWidth: ['responsive'],
		boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
		cursor: ['responsive'],
		display: ['responsive'],
		fill: ['responsive'],
		flex: ['responsive'],
		flexDirection: ['responsive'],
		flexGrow: ['responsive'],
		flexShrink: ['responsive'],
		flexWrap: ['responsive'],
		float: ['responsive'],
		fontFamily: ['responsive'],
		fontSize: ['responsive'],
		fontSmoothing: ['responsive'],
		fontStyle: ['responsive'],
		fontWeight: ['responsive', 'hover', 'focus', 'focus-within'],
		height: ['responsive'],
		inset: ['responsive'],
		justifyContent: ['responsive'],
		letterSpacing: ['responsive'],
		lineHeight: ['responsive'],
		listStylePosition: ['responsive'],
		listStyleType: ['responsive'],
		margin: ['responsive'],
		maxHeight: ['responsive'],
		maxWidth: ['responsive'],
		minHeight: ['responsive'],
		minWidth: ['responsive'],
		objectFit: ['responsive'],
		objectPosition: ['responsive'],
		opacity: ['responsive'],
		order: ['responsive'],
		outline: ['responsive', 'focus', 'focus-within'],
		overflow: ['responsive'],
		padding: ['responsive'],
		pointerEvents: ['responsive'],
		position: ['responsive'],
		resize: ['responsive'],
		stroke: ['responsive'],
		tableLayout: ['responsive'],
		textAlign: ['responsive'],
		textColor: ['responsive', 'hover', 'focus', 'focus-within'],
		textDecoration: ['responsive', 'hover', 'focus', 'focus-within'],
		textTransform: ['responsive'],
		userSelect: ['responsive'],
		verticalAlign: ['responsive'],
		visibility: ['responsive'],
		whitespace: ['responsive'],
		width: ['responsive'],
		wordBreak: ['responsive'],
		zIndex: ['responsive']
	},
	corePlugins: {},
	plugins: []
};
