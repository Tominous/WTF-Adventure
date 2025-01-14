import log from './log';
import PluginLoader from './plugins';

const MobsDictionary = {
  data: {},
  properties: {},
  plugins: {},
  getProperty: key => MobsDictionary.properties[key],
  setProperty: (key, value) => {
    MobsDictionary.properties[key] = value;
  },
  getData: key => MobsDictionary.data[key],
  setData: (key, value) => {
    MobsDictionary.data[key] = value;
  },
  idToString: (id) => {
    if (id in MobsDictionary.data) {
      return MobsDictionary.data[id].key;
    }

    return null;
  },
  idToName: (id) => {
    if (id in MobsDictionary.data) {
      return MobsDictionary.data[id].name;
    }

    return null;
  },
  stringToId: (name) => {
    if (name in MobsDictionary.data) {
      return MobsDictionary.data[name].id;
    }

    log.error(`${name} not found in the MobsDictionary.`);
    return 'null';
  },
  exists: id => id in MobsDictionary.data,
  setPlugins: (directory) => {
    MobsDictionary.plugins = PluginLoader(directory);
  },
  getXp: (id) => {
    if (id in MobsDictionary.data) {
      return MobsDictionary.data[id].xp;
    }

    return -1;
  },
  hasCombatPlugin: id => id in MobsDictionary.data
    && MobsDictionary.data[id].combatPlugin in MobsDictionary.plugins,
  isNewCombatPlugin: (id) => {
    if (id in MobsDictionary.data
      && MobsDictionary.data[id].combatPlugin in MobsDictionary.plugins) {
      return MobsDictionary.plugins[MobsDictionary.data[id].combatPlugin];
    }
    return null;
  },
};

export default MobsDictionary;
