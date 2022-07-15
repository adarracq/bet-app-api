export default {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
	roots: ['<rootDir>/src'],
	testEnvironment: 'node',
	preset: 'ts-jest',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
