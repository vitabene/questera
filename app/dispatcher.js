import flux from 'flux'

const Dispatcher = new flux.Dispatcher();

Dispatcher.register(function(action) {
	console.log(action);
});

export default Dispatcher
