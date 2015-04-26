# Angular Spec Helpers

This is a small collection of helpers for AngularJS testing, to help
reduce boilerplate code and avoid repetition for the most common tasks, such
as injecting services, triggering Angular's digest cycle, querying the DOM,
and more.

It's a successor to the `angular-jasmine-helpers` project, which had specific
helpers for testing with the Jasmine framework. This one is framework-agnostic
as it doesn't depend on any of testing frameworks or provide framework-specific
helpers.

I'll add more helpers as and when I come across situations in my projects
where a helper could help.

## Documentation

For now the only documentation is the JSDoc comments inside the code. It's a
very small utility at the moment, so I don't see the need for a proper
documentation.

It's worth noting the helpers are registered under the `h` namespace,
attached directly to the the global `window`. It's for convenience and
I doubt that it would cause any conflicts.