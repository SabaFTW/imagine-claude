const fs = require('fs')
const path = require('path')

const artifactName = process.argv[2]
if (!artifactName) {
  console.log('Usage: npm run add-artifact <ArtifactName>')
  process.exit(1)
}

const template = `import React from 'react'

const ${artifactName} = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white">
      <div className="container mx-auto px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">${artifactName}</h1>
        <p className="text-purple-200">Your new artifact is ready for creation!</p>
      </div>
    </div>
  )
}

export default ${artifactName}
`

const filePath = path.join(__dirname, '..', 'src', 'artifacts', `${artifactName}.jsx`)
fs.writeFileSync(filePath, template)
console.log(`✅ Created ${artifactName} at ${filePath}`)
console.log(`📝 Don't forget to import it in App.jsx!`)
