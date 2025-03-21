#!/bin/bash

# Get the component name from command line arguments
component_name=$1

# Check if the component name is provided
if [ -z "$component_name" ]; then
  echo "Please provide a component name."
  exit 1
fi

# Create the necessary directories and files for the component
mkdir -p ./src/components/$component_name
cd ./src/components/$component_name
touch index.jsx styles.scss

# Add the component code to the index.jsx file
cat > index.jsx << EOF
import React from 'react';
import './styles.scss';

const $component_name = () => {
  return (
    <div>
      <h1>$component_name Component</h1>
    </div>
  );
};

export default $component_name;
EOF

# Add any desired styles to the styles.scss file
echo ".${component_name.toLowerCase()} {" >> styles.scss
echo "  // Add your styles here" >> styles.scss
echo "}" >> styles.scss

echo "Created $component_name component at src/components/$component_name"