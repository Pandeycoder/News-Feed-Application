import s3 from '../utils/s3'; // Assuming s3 is exported from your configuration file

const checkS3Connection = async () => {
  try {
    const result = await s3.listBuckets().promise();
    console.log('S3 Connected. Available Buckets:', result.Buckets.map(bucket => bucket.Name));
    return true;
  } catch (error) {
    console.error('Error connecting to S3:', error.message);
    return false;
  }
};

checkS3Connection();
