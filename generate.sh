#!/bin/bash

# Check if folder_name argument is provided
if [ -z "$1" ]; then
    read -p "No folder name provided. Please enter the folder name: " folder_name
else
    # Use the provided folder name to create the new folder and files
    folder_name="$1"
fi

# Display directories and prompt for selection
select_directory() {
    local parent_dir="$1"
    echo "Select a directory from $parent_dir:"
    
    # List directories in the parent directory
    select dir in $(find "$parent_dir" -mindepth 1 -maxdepth 1 -type d -exec basename {} \;) "Cancel"; do
        if [[ "$dir" == "Cancel" ]]; then
            echo "Operation canceled."
            exit 1
        elif [ -n "$dir" ]; then
            echo "You selected: $dir"
            selected_dir="$parent_dir/$dir"
            break
        else
            echo "Invalid selection, try again."
        fi
    done
}


# Call function to select boilerplates directory
base_boilerplate=".boilerplates"
selected_dir="$base_boilerplate"

# Keep selecting subdirectories if any exist
while true; do
    select_directory "$selected_dir"
    
    # Check if there are further subdirectories
    if [ -z "$(find "$selected_dir" -mindepth 1 -maxdepth 1 -type d)" ]; then
        echo "No more subdirectories. Using boilerplate from: $selected_dir"
        break
    fi
    echo "Using boilerplate from: $selected_dir"
done

# Prompt user for the target directory with tab completion
read -e -p "Enter the target directory (absolute or relative path): " target_directory
# Check if the target directory exists
if [ ! -d "$target_directory" ]; then
    echo "Target directory does not exist. Please provide a valid directory."
    exit 1
fi

# Create the new folder using the provided folder name in the target directory
mkdir -p "$target_directory/$folder_name"

# Copy all files and subfolders from the selected boilerplate folder to the new folder
cp -r "$selected_dir"/* "$target_directory/$folder_name"

# Function to recursively rename files to match the folder name while preserving everything after the first dot
rename_files_recursively() {
    local current_dir="$1"
    local folder_name="$2"
    
    # Iterate through files and directories in the current folder
    for item in "$current_dir"/*; do
        if [ -d "$item" ]; then
            # Recursively rename files in subfolders
            rename_files_recursively "$item" "$folder_name"
        else
            # Replace placeholders in file content
            sed -i "s/{{fileName}}/$folder_name/g" "$item"
            
            # Preserve everything after the first dot in the filename
            new_name="${item#*/}"
            new_extension="${new_name#*.}"
            mv "$item" "${current_dir}/${folder_name}.${new_extension}"
        fi
    done
}

# Call the recursive renaming function for the newly created folder
rename_files_recursively "$target_directory/$folder_name" "$folder_name"

echo "Boilerplate copied to $folder_name with files renamed to $folder_name with their respective extensions."
