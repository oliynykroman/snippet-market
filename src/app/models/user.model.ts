export class User {
    id: number;
    email: string;
    password: string;
}
export class UserData extends User {
    secondName: string;
    firstName: string;
    gitProfile: string;
}
export class UserGitData extends UserData {
    public_repos: number;
    public_gists: number;
    avatar_url: string;
}