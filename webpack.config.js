const path = require('path');

module.exports = {
    entry: './src/injected-script.ts', // Point d'entrée de votre application
    output: {
        filename: 'injected-script.js', // Le nom du fichier de sortie
        path: path.resolve(__dirname, 'dist'), // Le chemin du dossier de sortie
    },
    resolve: {
        extensions: ['.ts', '.js'], // Les extensions de fichier à résoudre
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Utilise ts-loader sur les fichiers .ts et .tsx
                exclude: /node_modules/, // Ignore les fichiers dans node_modules
                use: 'ts-loader',
            },
        ],
    },
    mode: 'production', // Mode de compilation
};
