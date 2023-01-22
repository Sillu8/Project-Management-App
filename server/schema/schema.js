const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

const Project = require('../models/Project');
const Client = require('../models/Client');


//Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent,args) {
        return Client.findById(parent.clientId);
      }
    }
  })
});


//Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType), //GraphQLList because its a list of data
      resolve(parent, args) {
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } }, //ID to get a single project
      resolve(parent, args) {   //Resolver
        return Project.findById(args.id);
      }
    },
    clients: {
      type: new GraphQLList(ClientType), //GraphQLList because its a list of data
      resolve(parent, args) {
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, //ID to get a single client
      resolve(parent, args) {   //Resolver
        return Client.findById(args.id)
      }
    }
  }
});




module.exports = new GraphQLSchema({
  query: RootQuery
})