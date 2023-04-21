interface Tenant {
    id: string
    account : string
}

interface Stack {
    id: String
    title: String
}

interface Event {} // stores github actions

interface StudentStack {
    id: String
    title: String // devops-a
    tenant: Tenant // personal , org-a
    progression : [String] // task 1 , task 2 , task N..
    repository : String // github.com/user-a/devops-a , linking repository when new stack starts, install Github app or update repos via github apps
}

interface Student {
    user : User
    stacks : [StudentStack] // in-progress => "DevOps A"
}

interface Publisher {
    user : User
    stacks : [Stack] // owning and subscribed
}

interface Mentor {}

interface User {
    id : String
    roles : [String]
    tenants : [Tenant]
}
