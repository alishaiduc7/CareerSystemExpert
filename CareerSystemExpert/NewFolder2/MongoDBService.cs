using CareerSystemExpert.NewFolder1;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace CareerSystemExpert.NewFolder2
{
    public class MongoDBService
    {

        private readonly IMongoCollection<Career> _careersCollection;

        public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _careersCollection = database.GetCollection<Career>(mongoDBSettings.Value.CollectionName);
        }

      //  public async Task<List<Career>> GetAsync() { }
        public async Task CreateAsync(Career career) { }
        public async Task AddToPlaylistAsync(string id, string movieId) { }
        public async Task DeleteAsync(string id) { }
    }
}
