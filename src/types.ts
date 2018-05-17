export type FolderContainer = {
    files: Array<string>
    folders: Array<FolderContainer>
}