const mongoose = require('mongoose');
const Post = require('./models/Post'); // Adjust the path according to your project structure

// Replace 'yourDatabaseName' with the actual name of your database
const dbUri ='mongodb+srv://joshipankaj70451:pankaj11@cluster0.qdpla.mongodb.net/test?retryWrites=true&w=majority';

const examplePosts = [
  {
    consignmentNo: 'ABC123',
    senderName: 'Alice Johnson',
    senderNumber: '123-456-7890',
    receiverName: 'Bob Smith',
    receiverNumber: '098-765-4321',
    state: 'California',
    city: 'Los Angeles',
    pincode: '90001',
    area: 'Downtown',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    deliveryStatus: 'delivered'
  },
  {
    consignmentNo: 'XYZ456',
    senderName: 'Charlie Brown',
    senderNumber: '555-555-5555',
    receiverName: 'Diana Prince',
    receiverNumber: '444-444-4444',
    state: 'New York',
    city: 'New York',
    pincode: '10001',
    area: 'Midtown',
    addressLine1: '456 Elm St',
    addressLine2: '',
    deliveryStatus: 'pending'
  },
  {
    consignmentNo: 'XYZ452',
    senderName: 'Charlie Brown',
    senderNumber: '555-555-5555',
    receiverName: 'Diana Prince',
    receiverNumber: '444-444-4444',
    state: 'New York',
    city: 'New York',
    pincode: '10001',
    area: 'Midtown',
    addressLine1: '456 Elm St',
    addressLine2: '',
    deliveryStatus: 'pending'
  }
];

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing posts (optional)
    await Post.deleteMany({});

    // Insert example posts
    await Post.insertMany(examplePosts);

    console.log('Example posts inserted');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
